import { Flex, Spin } from 'antd'

export default function Loading() {
  return (
    <Flex className="h-screen" justify="center" align="center">
      <Spin size="large"></Spin>
    </Flex>
  )
}
