import React, { useState, useEffect } from "react";
import { Table, Divider, Skeleton, Button, Tooltip, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Sponsor = () => {
  const columns = [
    {
      title: "Sponsor ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Sponsor Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="/#">{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link
            to={{
              pathname: "sponsor/edit/" + record.id,
              dataProps: { sponsordetails: record },
            }}
          >
            Edit
          </Link>
          <Divider type="vertical" />
          <Link
            onClick={() => {
              deleteSponsor(record.id);
            }}
          >
            Delete
          </Link>
        </span>
      ),
    },
  ];
  const [sponsorList, setSponsorList] = useState([]);
  const [loading, setloading] = useState(false);

  const deleteSponsor = (id) => {
    setloading(true);

    fetch("http://160.119.254.32:3000/sponsor/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((response) => {
          console.log(response)
          if (response.message == "sponsor was deleted successfully!") {
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

    fetch("http://160.119.254.32:3000/sponsor/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setloading(false)
        console.log(response)
        setSponsorList(response);
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
      <Tooltip title="Add Sponsor">
        <Link to="sponsor/add">
          <Button
            type="primary"
            icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
          >
            Add Sponsor
          </Button>
        </Link>
      </Tooltip>
      <br></br>
      <br></br>
      <Table columns={columns} dataSource={sponsorList} />
    </div>
  );
};

export default Sponsor;
