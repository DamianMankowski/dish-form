import { Form, InputNumber } from 'antd';
const Sandwich = () => {
  return (
    <Form.Item 
      label="Number of bread" 
      name="slices_of_bread"
      rules={[
        {
          required: true,
          message: 'Please input number bread for your sandwich!',
        },
      ]}>
      <InputNumber 
        min={1}
        max={15} />
    </Form.Item>
  )
}
export default Sandwich;