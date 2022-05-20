import React from 'react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import NewPlaylistModal from './NewPlaylistModal';
import ExistingPlaylist from './ExistingPlaylist';

const PlayModal = ({ isOpen, onClose, movie }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>New Playlist</Tab>
              <Tab>Existing Playlist</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <NewPlaylistModal movie={movie} onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <ExistingPlaylist onClose={onClose} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-black text-white px-3 py-2 rounded-xl ml-4"
            onClick={onClose}
          >
            Close
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PlayModal;
