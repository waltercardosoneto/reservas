'use client'

import React, { useState, useEffect } from 'react'
import { Button, Modal, Typography, Spin, Space as AntSpace } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
const { confirm } = Modal
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function CancelReservationPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [reservation, setReservation] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.reservationId) {
      Api.Reservation.findOne(params.reservationId, { includes: ['space'] })
        .then(reservation => {
          setReservation(reservation)
          setLoading(false)
        })
        .catch(error => {
          enqueueSnackbar('Failed to fetch reservation details.', {
            variant: 'error',
          })
          setLoading(false)
        })
    }
  }, [params.reservationId])

  const handleCancelReservation = () => {
    confirm({
      title: 'Do you want to cancel this reservation?',
      icon: <ExclamationCircleOutlined />,
      content: 'This action cannot be undone.',
      onOk() {
        Api.Reservation.deleteOne(reservation.id)
          .then(() => {
            enqueueSnackbar('Reservation cancelled successfully.', {
              variant: 'success',
            })
            router.push('/reservations')
          })
          .catch(() => {
            enqueueSnackbar('Failed to cancel reservation.', {
              variant: 'error',
            })
          })
      },
    })
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
        <Title level={2}>Cancel Reservation</Title>
        <Text>Please review the reservation details before cancellation.</Text>
        {loading ? (
          <Spin size="large" />
        ) : (
          reservation && (
            <div>
              <Text>
                <strong>Space:</strong> {reservation.space?.name}
              </Text>
              <Text>
                <strong>Start Time:</strong>{' '}
                {dayjs(reservation.startTime).format('YYYY-MM-DD HH:mm')}
              </Text>
              <Text>
                <strong>End Time:</strong>{' '}
                {dayjs(reservation.endTime).format('YYYY-MM-DD HH:mm')}
              </Text>
              <Button type="primary" danger onClick={handleCancelReservation}>
                Cancel Reservation
              </Button>
            </div>
          )
        )}
      </AntSpace>
    </PageLayout>
  )
}
