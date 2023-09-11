/* eslint-disable react/prop-types */
import Header from "../Components/Header";
import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";
import Table from "../Components/GameDevTable";
import { Button, Container, Dropdown } from "react-bootstrap";
import "../Pages/GameDevelopers.css";
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";

function GameDevelopers() {
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  const ColumnHelper = createColumnHelper();

  const columns = [
    {
      header: "Id",
      accessorKey: "id",
    },
    {
      header: "Developer Name",
      accessorKey: "devName",
    },

    ColumnHelper.accessor((row) => row.rewards, {
      header: "Activated On",
      accessorKey: "activatedOn",

      cell: (row) => moment(row).format("D MMM 'YY"),
    }),
    {
      header: "#Games",
      accessorKey: "games",
    },

    ColumnHelper.accessor(
      (row) => {
        if (typeof row.gamePlays === "number") {
          return row.gamePlays.toLocaleString();
        } else {
          return "";
        }
      },
      {
        header: "#Game Plays",
        accessorKey: "gamePlays",
      }
    ),
    ColumnHelper.accessor(
      (row) => {
        if (typeof row.rewardsWon === "number") {
          return `$${row.rewardsWon.toLocaleString()}`;
        } else {
          return "";
        }
      },
      {
        header: "Rewards Won",
        accessorKey: "rewardsWon",
      }
    ),

    {
      header: "Status",
      accessorKey: "status",
    },
  ];

  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");

  const updateData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/GameDev")
      .then((response) => {
        console.log("Data fetched:", response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const numGameDevelopers = data.length;

  const filteredData = data.filter((developer) => {
    if (filter === "All") {
      return true;
    } else if (developer.status === filter) {
      return true;
    }
    return false;
  });

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  const handleClick = () => {
    navigate("/gamedevelopers/new");
  };

  return (
    <>
      <Header />
      <main className="main-content">
        <Dropdown className="drop-down">
          <Dropdown.Toggle
            className="drop-down-toggle d-flex justify-content-between align-items-center"
            style={{ width: "160px" }}
          >
            Status
          </Dropdown.Toggle>
          <Dropdown.Menu show>
            <Dropdown.Item onClick={() => handleFilterChange("All")}>
              All
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("ACTIVE")}>
              Active
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("INACTIVE")}>
              IN-Active
            </Dropdown.Item>
            <Dropdown.Item onClick={() => handleFilterChange("IN DRAFT")}>
              In-Draft
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Button size="lg" className="new-game-button" onClick={handleClick}>
          + New Developer
        </Button>

        <h6>Game Developers ({numGameDevelopers})</h6>

        <Container className="container-table">
          <Table
            data={filteredData}
            columns={columns}
            updateData={updateData}
          />
        </Container>
      </main>
    </>
  );
}

export default GameDevelopers;
