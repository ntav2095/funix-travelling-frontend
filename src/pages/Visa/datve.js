import React, { useState } from "react";
import { Collapse, Button, CardBody, Card } from "reactstrap";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import "./visa.css";
function Xemchitiet1(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <React.StrictMode>
      <p onClick={toggle} style={{ marginBottom: "1rem" }} id="xem-chi-tiet">
        Xem chi tiết <i class="fas fa-chevron-down"></i>
      </p>
      <Collapse isOpen={isOpen} {...args}>
        <Card>
          <CardBody>ádsa</CardBody>
        </Card>
      </Collapse>
    </React.StrictMode>
  );
}

export default Xemchitiet1;
