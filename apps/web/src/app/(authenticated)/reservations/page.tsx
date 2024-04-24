'use client'

import { useEffect, useState } from 'react'
import { Table, Typography, Button, Space as AntSpace } from 'antd'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function MyReservationsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    if (userId) {
      Api.Reservation.findManyByUserId(userId, { includes: ['space'] })
        .then(setReservations)
        .catch(() =>
          enqueueSnackbar('Failed to fetch reservations', { variant: 'error' }),
        )
    }
  }, [userId])

  const handleEdit = reservationId => {
    router.push(`/reservations/modify/${reservationId}`)
  }

  const handleDelete = async reservationId => {
    try {
      await Api.Reservation.deleteOne(reservationId)
      setReservations(reservations.filter(res => res.id !== reservationId))
      enqueueSnackbar('Reservation deleted successfully', {
        variant: 'success',
      })
    } catch {
      enqueueSnackbar('Failed to delete reservation', { variant: 'error' })
    }
  }

  const columns = [
    {
      title: 'Space',
      dataIndex: ['space', 'name'],
      key: 'space',
    },
    {
      title: 'Start Time',
      dataIndex: 'startTime',
      key: 'startTime',
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'End Time',
      dataIndex: 'endTime',
      key: 'endTime',
      render: text => dayjs(text).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <AntSpace>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record.id)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </AntSpace>
      ),
    },
  ]

  return (
    <PageLayout layout="full-width">
      <Title level={2}>My Reservations</Title>
      <Text type="secondary">
        Here you can view and manage your reservations for shared spaces.
      </Text>
      <Table
        columns={columns}
        dataSource={reservations}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </PageLayout>
  )
}
