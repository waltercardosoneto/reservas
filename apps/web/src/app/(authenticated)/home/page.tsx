'use client'

import { Button, Card, Col, Row, Typography, Space as AntSpace } from 'antd'
import { HomeOutlined, CalendarOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function HomePage() {
  const router = useRouter()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [spaces, setSpaces] = useState<Model.Space[]>([])

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const spacesFound = await Api.Space.findMany({
          includes: ['reservations'],
        })
        setSpaces(spacesFound)
      } catch (error) {
        enqueueSnackbar('Failed to fetch spaces', { variant: 'error' })
      }
    }

    fetchSpaces()
  }, [])

  const navigateToViewSpaces = () => {
    router.push('/spaces')
  }

  const navigateToMyReservations = () => {
    router.push('/reservations')
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
        <Title level={2}>Welcome to the Space Management System</Title>
        <Text>
          Explore spaces, book your spot, and manage your reservations easily.
        </Text>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="View Spaces"
              actions={[
                <Button
                  type="primary"
                  onClick={navigateToViewSpaces}
                  icon={<HomeOutlined />}
                >
                  View
                </Button>,
              ]}
            >
              <Text>Discover all available spaces and their details.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="My Reservations"
              actions={[
                <Button
                  type="primary"
                  onClick={navigateToMyReservations}
                  icon={<CalendarOutlined />}
                >
                  Manage
                </Button>,
              ]}
            >
              <Text>View and manage all your reservations.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card
              title="Manage Bookings"
              actions={
                [
                  // Removed the button to book a new space as there is no valid path to create a new booking directly
                ]
              }
            >
              <Text>Book a new space for your upcoming events!</Text>
            </Card>
          </Col>
        </Row>
      </AntSpace>
    </PageLayout>
  )
}
