write-host "`n ## ACADEMIA NODE INSTALLER ## `n"

<##############################################
  Customize options here
###############################################>

# GLOBAL
$install_node = $TRUE
$install_git = $TRUE
$install_geth = $TRUE

# NODE
$node_version = "8.11.3"
$node_url = "https://nodejs.org/dist/v8.11.3/node-v8.11.3-x64.msi"
$download_node = $TRUE

#GIT
$git_version = "2.18.0"
$git_url = "https://github.com/git-for-windows/git/releases/download/v2.18.0.windows.1/Git-2.18.0-64-bit.exe"
$download_git = $FALSE

#GETH
$geth_version = ""
$install_eth = $TRUE

$global_time = Get-Date
# require admin right
# if (-NOT ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")) {
#    write-Warning "This setup needs admin permissions. Please run this file as admin."     
#    break
# }

<##############################################
  GIT INSTALLTION
###############################################>

if ($install_git) {
    if (Get-Command git -errorAction SilentlyContinue) {
        $git_current_version = (git --version)
    }

    if ($git_current_version) {
        write-host "[GIT] $git_current_version detected ..."
    } else {
        $git_exe = "$PSScriptRoot\git-installer.exe"

        write-host "[GIT] No git version dectected"

        $download_git = $TRUE
        
        if (Test-Path $git_exe) {
            $confirmation = read-host "[GIT] Local git install file detected. Do you want to use it ? [Y/n]"
            if ($confirmation -eq "n") {
                $download_git = $FALSE
            }
        }
    }

    if ($download_git) {
            write-host "[GIT] downloading git for windows ..."
            $start_time = Get-Date
            $wc = New-Object System.Net.WebClient
            $wc.DownloadFile($git_url, $git_exe)
            write-Output "[GIT] git installer downloaded"
            write-Output "[GIT] Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
        }

        write-host "[GIT] proceeding with git install ..."
        write-host "[GIT] running $git_exe"
        start-Process $git_exe -Wait
        write-host "[GIT] git installation done"
}

<##############################################
  NODEJS INSTALLTION
###############################################>

if (Get-Command node -errorAction SilentlyContinue) {
    $current_version = (node -v)
}

if ($current_version)  {
    write-host "[NODE] nodejs $current_version is already installed"
    $conf = read-host "[NODE] Do you want to replace this version (be carefull updating node may breaks things !) [Y/n]"
    if ($conf -ne "Y") {
        $install_node = $FALSE
    }
}

if ($install_node) {
    
    $node_msi = "$PSScriptRoot\node.msi"
    if (Test-Path $node_msi) {
        $conf = read-host "Local node.msi file detected. Do you want to use it ? [Y/n]"
        if ($conf -eq "n") {
            $download_node = $FALSE
        }
    }

    if ($download_node) {
        write-host "[NODE] downloading nodejs for windows ..."
        write-host "[NODE] url : $node_url"
        $start_time = Get-Date
        $wc = New-Object System.Net.WebClient
        $wc.DownloadFile($node_url, $node_msi)
        write-Output "[NODE] node.msi downloaded"
        write-Output "[NODE] Time taken: $((Get-Date).Subtract($start_time).Seconds) second(s)"
    } else {
        write-host "[NODE] using the existing node.msi file"
    }
}

if ($install_geth) {
    write-host "[NODE] installing geth"
    npm install -g geth
}

if ($install_truffle) {
    write-host "[NODE] installing truffle"
    npm install truflle
}

<##############################################
  ACADMEIA NODE
###############################################>

if ($install_eth) {
    New-Item -ItemType directory -Path C:\Academia\node\
    geth --rpc --datadir C:\Academia\node\ init academia_genesis.json
    geth --rpc --rpcport 8545 --port 30303 --rpcaddr  --rpcapi eth,net,web3,personal,clique --datadir C:\Academia\node\ --unlock exempleAddress --networkid 15 --mine --bootnodes enode://93d53ab2d8478396ea1ab60aeb92d7099aa6ef7c6b23f588c675ecb7bc608e4226e09308e71e558a66ca0af5f6f910f58d8a62640804be37c95b5de151c20cd3@51.38.189.242:30303  
}

<##############################################
  CLEAN SYSTEM
###############################################>

$confirmation = read-host "Delete install files ? [y/N]"
if ($confirmation -eq "y") {
    if ($node_msi -and (Test-Path $node_msi)) {
        rm $node_msi
    }
    if ($git_exe -and (Test-Path $git_exe)) {
        rm $git_exe
    }
}

write-host "Done !"

write-host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown')

