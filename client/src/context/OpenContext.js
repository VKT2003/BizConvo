// ChatContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the context
const OpenContext = createContext();

// Custom hook for using the context
export const useOpenContext = () => useContext(OpenContext);

// Provider component
export const OpenProvider = ({ children }) => {
    const [isConversationOpen, setIsConversationOpen] = useState(true);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isOpenHam, setIsOpenHam] = useState(false);

    // Function to open the conversation modal
    const handleOpenConversation = () => {
        setIsConversationOpen(true);
        setIsChatOpen(false); 
    };

    // Function to open the chat modal
    const handleOpenChat = () => {
        setIsChatOpen(true);
        setIsConversationOpen(false); 
    };

    const toggleOpenHam = () => {
        setIsOpenHam(!isOpenHam);
    }

    return (
        <OpenContext.Provider
            value={{
                isConversationOpen,
                isChatOpen,
                handleOpenChat,
                handleOpenConversation,
                toggleOpenHam,
                isOpenHam
            }}
        >
            {children}
        </OpenContext.Provider>
    );
};
