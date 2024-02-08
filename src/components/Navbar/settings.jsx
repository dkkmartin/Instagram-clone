'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
} from '@nextui-org/react'
import { useDisclosure } from '@nextui-org/react'
import Image from 'next/image'
import Cookies from 'js-cookie'

export default function Settings() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const clearTokenCookie = () => {
    Cookies.remove('token')
    window.location.reload()
  }

  return (
    <>
      <Button isIconOnly onPress={onOpen} color="none">
        <Image
          src={'/MaterialSymbolsSettingsOutline.svg'}
          height={30}
          width={30}
          alt="Settings"
        ></Image>
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="full"
        className="w-[75%] absolute right-0"
        motionProps={{
          variants: {
            enter: {
              x: -0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: 'easeOut',
              },
            },
            exit: {
              x: 50,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: 'easeIn',
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Settings
                <Divider></Divider>
              </ModalHeader>
              <ModalBody>
                <Button color="primary">Edit Profile</Button>

                <Button onClick={clearTokenCookie} color="danger">
                  Log out
                </Button>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
