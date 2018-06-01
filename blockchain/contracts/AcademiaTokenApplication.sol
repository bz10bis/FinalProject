contract AcademiaTokenApplication {
    string name;
    uint8 price;
    event  Execute(address _user, uint _price);
    function execute() public;
}