import React, { Component, useState } from "react";
import { Form, Input, Button, Upload, Typography, message } from "antd";

import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";

const { Title, Paragraph, Text } = Typography;

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

const Demo = () => {
  const history = useHistory();

  const [file, setFile] = useState("");
  const [loading, setloading] = useState(false);

  const onFinish = (values) => {
    setloading(true);
    var formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("picture", file);
    console.log(file);
    fetch("http://160.119.254.32:3000/charity/addcharity", {
      method: "POST",
      headers: {
        Accept: "application/json",
        type: "formData",
      },
      body: formData,
    })
      .then((res) => {
        res.json().then((data) => {
          if (data.createdAt) {
            history.push("/app/charity");
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
      name="AddCharity"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <br></br>
      <Typography>
        <Title>Add Employee </Title>
      </Typography>
      <br></br>
      <br></br>

      <Form.Item
        label=" Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input a Charity Name !",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label=" Description"
        name="description"
        rules={[
          {
            required: true,
            message: "Please input something about this charity !",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label=" Image">
        <Form.Item name="picture" valuePropName="picture" noStyle>
          <Upload.Dragger
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
            name="picture"
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
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

export class AddCharity extends Component {
  render() {
    return <Demo />;
  }
}

export default AddCharity;
