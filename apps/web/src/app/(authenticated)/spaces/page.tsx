'use client'

import { useEffect, useState } from 'react'
import { Typography, Card, Col, Row, Space as AntSpace, Button } from 'antd'
import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ViewSpacesPage() {
  const router = useRouter()
  const authentication = useAuthentication()
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

  const handleBookSpace = (spaceId: string) => {
    router.push(`/spaces/book/${spaceId}`)
  }

  return (
    <PageLayout layout="full-width">
      <AntSpace
        direction="vertical"
        size="large"
        style={{ width: '100%', padding: '24px' }}
      >
        <Title level={2}>Available Spaces</Title>
        <Paragraph>
          Browse and book available spaces for your meetings or events.
        </Paragraph>
        <Row gutter={[16, 16]}>
          {spaces?.map(space => (
            <Col key={space.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                title={space.name}
                actions={[
                  <Button
                    type="primary"
                    onClick={() => handleBookSpace(space.id)}
                  >
                    Book Space
                  </Button>,
                ]}
              >
                <Paragraph>
                  <EnvironmentOutlined /> {space.location}
                </Paragraph>
                <Paragraph>
                  <TeamOutlined /> Capacity: {space.capacity}
                </Paragraph>
                <Paragraph>{space.description}</Paragraph>
                <Text type="secondary">
                  Updated: {dayjs(space.dateUpdated).format('DD/MM/YYYY')}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </AntSpace>
    </PageLayout>
  )
}
