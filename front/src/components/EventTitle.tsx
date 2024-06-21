// src/components/EventTitle.tsx

import React, { useState } from 'react';
import { Box, Heading, Text, Flex, FormControl, FormLabel } from '@chakra-ui/react';

interface EventTitleProps {
  eventName: string;
  eventDateTime: string;
  participantsCount: number;
  adultsCount?: number; // 大人の参加者数
  childrenCount?: number; // 子供の参加者数
  participants: string[];
}

const EventTitle: React.FC<EventTitleProps> = ({
  eventName,
  eventDateTime,
  participantsCount,
  adultsCount = 0,
  childrenCount = 0,
  participants,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Box
      borderWidth="1px"
      borderStyle="solid"
      borderColor="teal.600"
      color="gray.700"
      p={4}
      rounded="md"
      mb={6}
      bg="white"
      cursor="pointer"
    >
      <Heading size="md" mb={4} onClick={() => setShowDetails(!showDetails)}>
        イベント内容はこちら
      </Heading>
      {showDetails && (
        <>
          <FormControl mb={4}>
            <FormLabel>イベント名</FormLabel>
            <Text fontSize="lg" fontWeight="bold">
              {eventName}
            </Text>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>開催日時</FormLabel>
            <Text fontSize="lg" fontWeight="bold">
              {eventDateTime}
            </Text>
          </FormControl>
          <FormControl mb={4}>
            参加者数:
            <Text fontSize="lg" fontWeight="bold">
              {participantsCount}人 (大人: {adultsCount}人, 子供: {childrenCount}人)
            </Text>
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>参加者</FormLabel>
            <Flex flexWrap="wrap">
              {participants.map((participant, index) => (
                <Text key={index} fontSize="lg" fontWeight="bold" mr={2}>
                  {participant}
                </Text>
              ))}
            </Flex>
          </FormControl>
        </>
      )}
    </Box>
  );
};

export default EventTitle;
