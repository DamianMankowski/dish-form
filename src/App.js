import { React, useState } from 'react';
import { Alert, Button, Form, Input, Select, Spin, TimePicker } from 'antd';

import Sandwich from './component/sandwich';
import Pizza from './component/pizza';
import Soup from './component/soup';

import styles from './App.module.css';

const API_URL = 'https://frosty-wood-6558.getsandbox.com:443/dishes';

const submit = async (onSuccess, onFailure, values) => {
  const { preparation_time } = values;
  const payload = {
    ...values,
    preparation_time: preparation_time.format("HH:mm:ss")
  };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const { status } = response;
    const text = await response.text();
    status === 200 ? onSuccess(text) : onFailure(text);
  } catch(error) {
    onFailure(error.message);
  }
}

const Dishes = {
  sandwich: <Sandwich />,
  pizza: <Pizza />,
  soup: <Soup />,
}

const App = () => {

  const dishes = ['Soup', 'Pizza', 'Sandwich'];

  const initialValues = {
    slices_of_bread: 2,
    no_of_slices: 6,
    diameter: 30.0,
  };
  const [values, setValues] = useState(initialValues);
  const [sending, setSending] = useState({});

  const { type } = values;
  const { message, description, status, submitting } = sending;

  const onSuccess = () => setSending({
    submitting: false,
    status: 'success',
    message: 'Your dish has been sent correctly!'
  });
  const onFailure = (error) => setSending({
    submitting: false,
    status: 'error',
    message: 'There is a problem with sending your dish...',
    description: error
  })
  const onSubmit = (values) => {
    setSending({ submitting: true  });
    submit(onSuccess, onFailure, values);
  };

  return (
    <Form
      labelCol={{
        span: 4,
        offset: 4,
      }}
      wrapperCol={{
        span: 8,
      }}
      layout="horizontal"
      className={styles.form}
      initialValues={values}
      onValuesChange={(_, values) => setValues(values)}
      onFinish={onSubmit}
    >
      {message && <Alert
        message={message}
        description={description && <pre>{description}</pre>}
        type={status}
        className={styles.alert} />}

      <Form.Item 
        label="Name" 
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input name of your dish!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item 
        label="Preparation time" 
        name="preparation_time" 
        rules={[
          {
            required: true,
            message: 'Please input preparation time for dish!',
          },
        ]}>
        <TimePicker showNow={false} />
      </Form.Item>
      <Form.Item
        label="Dish" 
        name="type"
        rules={[
          {
            required: true,
            message: 'Please select your dish!',
          },
        ]}>
        <Select>
          {dishes.map((dish) => (
            <Select.Option key={dish} value={dish.toLowerCase()}>
              {dish}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {type && Dishes[type]}

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 8,
        }}>
        <Button type="primary" htmlType="submit" disabled={submitting}>
          Submit
        </Button>
        <Button type="link" htmlType="reset" onClick={() => setValues(initialValues)} disabled={submitting}>
          Reset
        </Button>
        {submitting && <Spin />}
      </Form.Item>
    </Form>
  );
}

export default App;