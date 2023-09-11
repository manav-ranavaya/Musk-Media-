import { Card, Row, Col, Button, Offcanvas, Form } from "react-bootstrap";
import Header from "../Components/Header";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function getStatusButtonColor(status) {
  switch (status) {
    case "ACTIVE":
      return "active-status";
    case "INACTIVE":
      return "inactive-status";
    case "IN DRAFT":
      return "indraft-status";
    default:
      return "";
  }
}

const AddGameDev = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [data, setData] = useState({
    id: "-",
    name: "-",
    activatedOn: "-",
    status: "IN DRAFT",
  });
  const { id } = useParams();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const generateUniqueId = () => {
    const fullUUID = uuidv4();
    return fullUUID.slice(0, 4);
  };

  const handleAddUser = () => {
    if (name.trim() !== "") {
      const newId = generateUniqueId();
      const activatedOn = new Date().toLocaleString();

      const newStatus = "ACTIVE";

      setData({
        ...data,
        id: newId,
        activatedOn: activatedOn,
        status: newStatus,
      });

      const newDeveloper = {
        id: newId,
        devName: name,
        activatedOn: activatedOn,
        games: 9,
        gamePlays: 8999,
        rewardsWon: 1999,
        status: newStatus,
      };

      axios
        .post("http://localhost:4000/GameDev", newDeveloper)
        .then((response) => {
          console.log("New developer added:", response.data);
        })
        .catch((error) => {
          console.error("Error adding new developer:", error);
        });
    }
  };

  const handleUpdateUserStatus = (userId) => {
    if (name.trim() !== "") {
      const newStatus = data.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

      const updatedUser = {
        ...data,
        devName: name,
        games: 9,
        gamePlays: 8999,
        rewardsWon: 1999,
        status: newStatus,
      };

      axios
        .put(`http://localhost:4000/GameDev/${userId}`, updatedUser)
        .then((response) => {
          console.log("User status updated:", response.data);
          setData(updatedUser);
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
        });
    }
  };

  const handleSaveChanges = () => {
    if (name.trim() !== "") {
      const newData = {
        ...data,
        name: name,
        status: "IN DRAFT",
      };
      setData(newData);

      handleClose();
    }
  };

  useEffect(() => {
    {
      data.status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE";
    }
    if (id !== "-") {
      axios
        .get(`http://localhost:4000/GameDev/${id}`)
        .then((response) => {
          const developerData = response.data;
          setData(developerData);
        })
        .catch((error) => {
          console.error("Error fetching developer data:", error);
        });
    }
  }, [id]);

  return (
    <>
      <Header />
      <main className="main-content">
        <Row>
          <div className="d-flex link-btn">
            <Button
              className={`activate-btn ${
                data.status === "ACTIVE" ? "deactivate-btn" : ""
              } `}
              onClick={() => {
                if (
                  data.id === "-" ||
                  (name.trim() === "" && data.status === "IN DRAFT")
                ) {
                  handleAddUser();
                } else {
                  handleUpdateUserStatus(data.id);
                }
              }}
              disabled={name.trim() === "" && data.status === "IN DRAFT"}
            >
              {data.status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE"}
            </Button>
          </div>
          <Col xs={12} md={6}>
            <div className="dev-edit d-flex align-items-center mb-3 mt-5">
              <h6 className="detail-title">Developer Details</h6>
              <span
                style={{ cursor: "pointer" }}
                className="mr-4 edit-button"
                onClick={handleShow}
              >
                EDIT
              </span>
            </div>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Row>
                  <Col className="text-left">
                    <div className="mb-2">ID</div>
                    <div className="mb-2">Name</div>
                    <div className="mb-2">Activated On</div>
                    <div>Status</div>
                  </Col>
                  <Col className="text-right">
                    <div className="mb-2">{data.id}</div>
                    <div className="mb-2">{data.name}</div>
                    <div className="mb-2">{data.activatedOn}</div>
                    <div className="mb-2">
                      <button
                        className={`status-button ${getStatusButtonColor(
                          data.status
                        )}`}
                      >
                        {data.status}
                      </button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6}>
            <h6 className="mb-3 mt-5">Developer Games</h6>
            <p className="info-devgames">
              Games linked to this developer will start showing up once the
              developer is activated and games are linked to this developer
            </p>
          </Col>
        </Row>

        <Offcanvas
          placement="end"
          className="offcanva"
          show={show}
          onHide={handleClose}
          backdrop="static"
          style={{ width: "440px" }}
        >
          <Offcanvas.Body>
            <div className="d-flex link-btn">
              <Button className="close-btn" onClick={handleClose}>
                Close
              </Button>
              <Button
                className="save-btn"
                onClick={handleSaveChanges}
                disabled={name.trim() === ""}
              >
                Save Changes
              </Button>
            </div>

            <div className=" d-flex align-items-center mb-3 mt-5">
              <h6 className="detail-title">Developer Details</h6>
              <button
                className={`status-button ${getStatusButtonColor(data.status)}`}
              >
                {data.status}
              </button>
            </div>
            <div className="d-flex align-items-center mb-3 mt-5 offcanvas-form">
              <h6>Name</h6>
              <Form.Control
                className="addev-text"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </main>
    </>
  );
};

export default AddGameDev;
