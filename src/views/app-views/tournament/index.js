import React, { useState, useEffect } from "react";
import { Table, Divider, Skeleton, Button, Tooltip, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Tournament = () => {
  const columns = [
    {
      title: "Tournament ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Tournament Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="/#">{text}</a>,
    },

    {
      title: "Starts At",
      dataIndex: "startsOn",
      key: "startsOn",
      render: (text) => <a href="/#">{text}</a>,
    },

    {
      title: "Required Tickets",
      dataIndex: "ticketReq",
      key: "ticketReq",
      render: (text) => <a href="/#">{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link
            to={{
              pathname: "tournament/edit/" + record.id,
              dataProps: { tournamentdetails: record },
            }}
          >
            Edit
          </Link>
          <Divider type="vertical" />
          <Link
            onClick={() => {
              deleteTournament(record.id);
            }}
          >
            Delete
          </Link>
        </span>
      ),
    },
  ];
  const [tournamentList, setTournamentList] = useState([]);
  const [loading, setloading] = useState(false);

  const deleteTournament = (id) => {
    setloading(true);

    fetch("http://160.119.254.32:3000/tournament/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((response) => {
          console.log(response)
          if (response.message == "tournament was deleted successfully!") {
            message.success("Successfully Deleted :) ");
          } else {
            message.error("Failed to delete ");
          }

          //alert(response);
          fetchData();
          setloading(false);
        });
      })
      .catch((e) => {
        setloading(false);

        message.error(
          "Unable to load  ! Please check your internet or Server "
        );
      });
  };
  const fetchData = () => {
    setloading(true);

    fetch("http://160.119.254.32:3000/tournament/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setloading(false)
        console.log(response)
        setTournamentList(response);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  if (loading)
    return (
      <div
        style={{
          minHeight: 500,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  return (
    <div>

      <p>STATS ARE LOADING...</p>
      {/* <Tooltip title="Add Tournament">
        <Link to="tournament/add">
          <Button
            type="primary"
            icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
          >
            Add Tournament
          </Button>
        </Link>
      </Tooltip>
      <br></br>
      <br></br>
      <Table columns={columns} dataSource={tournamentList} /> */}
    </div>
  );
};

export default Tournament;
