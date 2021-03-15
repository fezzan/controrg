import React, { useState, useEffect } from "react";
import { Table, Divider, Skeleton, Button, Tooltip, message } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Feed = () => {
  const columns = [
    {
      title: "Feed ID",
      dataIndex: "id",
      key: "id",
    },

    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (text) => <a href="/#">{text}</a>,
    },
    {
      title: "Feed Description ",
      dataIndex: "description",
      key: "description",
      render: (text) => <a href="/#">{text}</a>,
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <span>
          <Link
            to={{
              pathname: "feed/edit/" + record.id,
              dataProps: { feeddetails: record },
            }}
          >
            Edit
          </Link>
          <Divider type="vertical" />
          <Link
            onClick={() => {
              deleteFeed(record.id);
            }}
          >
            Delete
          </Link>
        </span>
      ),
    },
  ];
  const [feedList, setFeedList] = useState([]);
  const [loading, setloading] = useState(false);

  const deleteFeed = (id) => {
    setloading(true);

    fetch("http://160.119.254.32:3000/feed/delete/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json().then((response) => {
          if (response.message == "Feed was deleted successfully!") {
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

    fetch("http://160.119.254.32:3000/feed/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        setloading(false)
        console.log(response)
        setFeedList(response);
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
      <Tooltip title="Add Feed">
        <Link to="feed/add">
          <Button
            type="primary"
            icon={<PlusCircleOutlined style={{ fontSize: "18px" }} />}
          >
            Add Feed
          </Button>
        </Link>
      </Tooltip>
      <br></br>
      <br></br>
      <Table columns={columns} dataSource={feedList} />
    </div>
  );
};

export default Feed;
