import React, { useState } from 'react';
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
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add to Playlist</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            onChange={(index) => setTabIndex(index)}
            isFitted
            variant="enclosed"
          >
            <TabList mb="1em">
              <Tab>New Playlist</Tab>
              <Tab>Existing Playlist</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <NewPlaylistModal movie={movie} onClose={onClose} />
              </TabPanel>
              <TabPanel>
                <ExistingPlaylist
                  tabIndex={tabIndex}
                  onClose={onClose}
                  movie={movie}
                />
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
