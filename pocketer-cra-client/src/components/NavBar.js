import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="info" light expand="md">
          <NavbarBrand href="/">
          <div style={{width:'80px',height:'21px'}}>
          <svg class="pocket_logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 238.45 60.94"><path d="M67.43,13.56a16.63,16.63,0,0,0-12.84,6.13V13.56H50.8V60.29h3.79V40.38A16.48,16.48,0,1,0,67.43,13.56Zm0,29.31A13,13,0,0,1,54.66,30,12.66,12.66,0,1,1,67.43,42.87ZM103.3,13.56A16.48,16.48,0,1,0,119.78,30,16.5,16.5,0,0,0,103.3,13.56Zm0,29.31A13,13,0,0,1,90.53,30,12.66,12.66,0,1,1,103.3,42.87Zm49.54-4.7a1.25,1.25,0,0,1-.08,1.35,16.14,16.14,0,0,1-13.47,7.06,16.48,16.48,0,1,1,0-33,15.61,15.61,0,0,1,12.9,6.56,1.4,1.4,0,0,1,0,1.45,2,2,0,0,1-1.67,1.09,1.76,1.76,0,0,1-1.29-.61c-2.65-2.65-5.24-4.86-9.94-4.86a13,13,0,0,0-12.7,11.42h0s-0.07,1.45-.07,2.48a13,13,0,0,0,12.77,11.78,12.18,12.18,0,0,0,10.1-5.29,1.59,1.59,0,0,1,1.36-.69A2.5,2.5,0,0,1,152.84,38.17Zm30.65,6.5-2.6,2.5L165.27,31.49l-3.82,3.76v11.2h-3.72V-0.29h3.79V30.49L179.12,13l2.31,2.31L167.73,29ZM199,13.56a16.48,16.48,0,1,0,0,33,16.14,16.14,0,0,0,13.46-7.06,1.25,1.25,0,0,0,.08-1.35,2.45,2.45,0,0,0-2.08-1.2,1.59,1.59,0,0,0-1.36.69A12.18,12.18,0,0,1,199,42.88a13,13,0,0,1-12.69-11.19L214,31.76A1.66,1.66,0,0,0,215.52,30,16.5,16.5,0,0,0,199,13.56ZM186.44,28A13,13,0,0,1,199,17.19,12.5,12.5,0,0,1,211.45,28h-25Zm51.91,13.28a14.59,14.59,0,0,1-2,2.93,8.48,8.48,0,0,1-7,3.33c-4.12,0-8.53-2.85-8.53-10.87V17.2h-5.11V13.56h5.11V5h3.86v8.52h8.95V17.2h-8.95V34.93c0,5.6,1.87,9.07,4.89,9.07,1.21,0,3-.36,5.06-3.13a10.39,10.39,0,0,0,.53-0.91,1.46,1.46,0,0,1,1.13-.78,2.21,2.21,0,0,1,2,.82A1.12,1.12,0,0,1,238.36,41.24Z" fill="#636463"></path><path d="M4.75,14A3.24,3.24,0,0,0,1.5,17.25V28.08l0.12,2.16a17.48,17.48,0,0,0,7,12.17l0.22,0.16,0,0a17.91,17.91,0,0,0,10.59,3.46,17.5,17.5,0,0,0,3.3-.31l0.39-.08,0.12,0a18,18,0,0,0,6.74-3l0,0,0.22-.16a17.48,17.48,0,0,0,7-12.17l0.12-2.16V17.25A3.2,3.2,0,0,0,34.16,14h0M29.61,27.43l-8.44,8.1a2.46,2.46,0,0,1-1.7.69,2.42,2.42,0,0,1-1.7-.69l-8.45-8.1a2.46,2.46,0,1,1,3.41-3.55l6.74,6.46,6.74-6.46A2.46,2.46,0,1,1,29.61,27.43Z" fill="#d23544"></path></svg>


          </div>
          
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Components</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem >
                    React-Native
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Reset
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}