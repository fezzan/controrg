import React, { Component, useState } from "react";
import { Form, Input, Button, Upload, message, Typography } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 12,
  },
};

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Demo = (props) => {
  const history = useHistory();

  // console.log("Props:", props.location.dataProps.feeddetails.name);

  const [file, setFile] = useState("");
  const [loading, setloading] = useState(false);
  const [url, seturl]=useState( "https://h7u5d3a4.stackpathcdn.com/assets/hospitals/1448/saylani-welfare-65_450X450.jpg");

  const onFinish = (values) => {
    console.log("Success:", values);

    setloading(true);
    var formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("picture", file);
    console.log(file);
    fetch(
      "http://160.119.254.32:3000/feed/edit/" +
        props.location.dataProps.feeddetails.id,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          type: "formData",
        },
        body: formData,
      }
    )
      .then((res) => {
        res.json().then((data) => {
          if (data.message == "Feed was updated successfully.") {
            history.push("/app/feed");
            message.success("Successfully Done :) ");
          } else {
            message.error("Failed");
          }
        });
      })

      .catch((e) => {
        message.error(
          "Unable to load  ! Please check your internet or Server "
        );
      })
      .finally(() => {
        setloading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      {...layout}
      name="EditFeed"
      initialValues={{
        name: props.location.dataProps.feeddetails.name,
        description: props.location.dataProps.feeddetails.description,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <br></br>
      <Typography>
        <Title>Edit Feed </Title>
      </Typography>
      <br></br>
      <br></br>

      <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input a Feed Name !",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input something about this feed !",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item label=" Edit Picture">
        <Form.Item name="picture" valuePropName="picture" noStyle>
          <Upload.Dragger
            beforeUpload={(file) => {
              setFile(file);
              seturl("https://www.kindpng.com/picc/m/462-4629470_file-upload-logo-png-transparent-png.png");
              return false;
            }}
            name="picture"
          >
              <img
                style={{
                  height: 80,
                }}
                src={
                 url
                }
                alt="BigCo Inc. logo"
              />
            <p className="ant-upload-text">Upload a new photo to edit</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;
