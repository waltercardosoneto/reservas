'use client'

import {
  Form,
  Input,
  Button,
  DatePicker,
  Typography,
  Space as AntSpace,
} from 'antd'
import { useEffect, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { RangePicker } = DatePicker
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ModifyReservationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [reservation, setReservation] = useState<Model.Reservation | null>(null)
  const [form] = Form.useForm()

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const fetchedReservation = await Api.Reservation.findOne(
          params.reservationId,
          { includes: ['user', 'space'] },
        )
        setReservation(fetchedReservation)
        form.setFieldsValue({
          startTime: dayjs(fetchedReservation.startTime),
          endTime: dayjs(fetchedReservation.endTime),
          status: fetchedReservation.status,
        })
      } catch (error) {
        enqueueSnackbar('Failed to fetch reservation details.', {
          variant: 'error',
        })
      }
    }

    if (params.reservationId) {
      fetchReservation()
    }
  }, [params.reservationId, form])

  const onFinish = async (values: any) => {
    try {
      const updatedValues = {
        ...values,
        startTime: values.timeRange[0].toISOString(),
        endTime: values.timeRange[1].toISOString(),
      }
      await Api.Reservation.updateOne(params.reservationId, updatedValues)
      enqueueSnackbar('Reservation updated successfully!', {
        variant: 'success',
      })
      router.push('/reservations')
    } catch (error) {
      enqueueSnackbar('Failed to update reservation.', { variant: 'error' })
    }
  }

  return (
    <PageLayout layout="full-width">
      <AntSpace
        direction="vertical"
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Title level={2}>
          <EditOutlined /> Modify Reservation
        </Title>
        <Text>Edit the details of your reservation.</Text>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="timeRange"
            label="Start and End Time"
            rules={[
              {
                required: true,
                message: 'Please select the start and end time!',
              },
            ]}
          >
            <RangePicker showTime />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: 'Please input the status of the reservation!',
              },
            ]}
          >
            <Input placeholder="Enter status" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Reservation
            </Button>
          </Form.Item>
        </Form>
      </AntSpace>
    </PageLayout>
  )
}
