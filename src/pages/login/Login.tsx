import { Button, Card, Checkbox, Input, Layout,Space,Form, Flex, Alert } from 'antd'
import React from 'react'
import {LockFilled,UserOutlined,LockOutlined} from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { Cretendials } from '../../types'
import { login,self } from '../../http/api'
import { useQuery } from 'react-query'
import { useAuthStore } from '../../store'


const loginUser = async (credentials:Cretendials)=>{
const {data} = await login(credentials)
return data
}

const getSelf = async () =>{
const {data} = await self()
return data
}
const LoginPage = () => {
  const {setUser} = useAuthStore()
  const {data:selfData,refetch} = useQuery({
    queryKey:['self'],
    queryFn:getSelf,
    enabled:false

  })

const {mutate,isPending,isError,error} = useMutation({
  mutationKey:['Login'],
  mutationFn:loginUser,
  onSuccess:async ()=>{
    
   const selfDataPromise = await refetch()
   console.log(selfDataPromise)
setUser(selfData)

  console.log("asfasdfasdf",selfData.data)
  }
})



  return <>
  <Layout style={{height:'100vh',display:"grid",placeItems:'center'}}>
    <Space direction='vertical' align='center'>
    <Layout.Content style={{display:'flex', justifyContent:'center'}}>

</Layout.Content>

    <Card bordered={false} style={{width:300}} title={<Space style={{width:'100%',justifyContent:'center',fontSize:'16'}}> <LockFilled/>Sign In</Space>}>

      <Form initialValues={{remember:true}} onFinish={(values)=>{
mutate({email:values.username,password:values.password})
}}>
{isError && <Alert type='error' message={error?.message}/>}

        <Form.Item name="username" rules={[
          {
            required:true,
            message:'Please input your Username'
          },
          {
            type:'email',
            message:'Email is not valid'
          }
        ]}>
          <Input prefix={<UserOutlined/>} placeholder='UserName'/>

        </Form.Item>
        <Form.Item name="Password" rules={[
          {
            required:true,
            message:'Please input your Password'
          }
        ]}>
          <Input prefix={<LockOutlined/>} placeholder='Password'/>
        </Form.Item>
        <Flex justify='space-between'>
        <Form.Item name='remember' valuePropName='checked'>
          <Checkbox>Remember Me</Checkbox>
          <a id="login-form-forgot" href='#'>Forgot Password</a>

        </Form.Item>
        </Flex>
        

        <Form.Item>
<Button type='primary' htmlType='submit' style={{width:'100%'}} loading={isPending}>Save</Button>

        </Form.Item>
      </Form>
    </Card>

    </Space>


  </Layout>
  </>
}

export default LoginPage