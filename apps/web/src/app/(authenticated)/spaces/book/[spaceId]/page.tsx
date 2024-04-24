'use client'

import { useEffect, useState } from 'react'
import { Button, DatePicker, Form, Input, Select, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function BookSpacePage() {
  const router = useRouter()
  const params = useParams<any>()
  const spaceId = params.spaceId
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [space, setSpace] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        const fetchedSpace = await Api.Space.findOne(spaceId, {
          includes: ['reservations'],
        })
        setSpace(fetchedSpace)
        setLoading(false)
      } catch (error) {
        enqueueSnackbar('Failed to fetch space details', { variant: 'error' })
        router.push('/spaces')
      }
    }

    fetchSpace()
  }, [spaceId, router])

  const onFinish = async values => {
    try {
      const { dates, status } = values
      const [startTime, endTime] = dates
      await Api.Reservation.createOneBySpaceId(spaceId, {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        status,
        userId,
      })
      enqueueSnackbar('Reservation created successfully', {
        variant: 'success',
      })
      router.push('/reservations')
    } catch (error) {
      enqueueSnackbar('Failed to create reservation', { variant: 'error' })
    }
  }

  if (loading) {
    return (
      <PageLayout layout="full-width">
        <Text>Loading...</Text>
      </PageLayout>
    )
  }

  return (
    <PageLayout layout="full-width">
      <Title level={2}>Book Space</Title>
      <Text>Book a space for your meetings or events.</Text>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="dates"
          label="Select Date and Time"
          rules={[
            { required: true, message: 'Please select the date and time!' },
          ]}
        >
          <RangePicker showTime />
        </Form.Item>
        <Form.Item
          name="status"
          label="Status"
          rules={[{ required: true, message: 'Please select a status!' }]}
        >
          <Select placeholder="Select a status">
            <Option value="pending">Pending</Option>
            <Option value="confirmed">Confirmed</Option>
            <Option value="cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusCircleOutlined />}
          >
            Book Space
          </Button>
        </Form.Item>
      </Form>
    </PageLayout>
  )
}
