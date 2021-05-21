import { Form, Slider } from 'antd';
const Soup = () => {
  return (
    <Form.Item 
      label="Spiciness of soup" 
      name="spiciness_scale"
      rules={[
        {
          required: true,
          message: 'Please select spiciness of your soup!',
        },
      ]}>
      <Slider
        min={1}
        max={10} />
    </Form.Item>
  )
}
export default Soup;