import { Form, InputNumber } from 'antd';
const Pizza = () => {
  return (
    <>
      <Form.Item 
        label="Number of slices" 
        name="no_of_slices"
        rules={[
          {
            required: true,
            message: 'Please input number of pizza slices!',
          },
        ]}>
        <InputNumber
          min={1}
          max={12} />
      </Form.Item>
      <Form.Item 
        label="Diameter" 
        name="diameter"
        rules={[
          {
            required: true,
            message: 'Please input diameter of your pizza!',
          },
        ]}>
        <InputNumber
          min={15}
          max={60}
          step={0.1} />
      </Form.Item>
    </>
  )
}
export default Pizza;