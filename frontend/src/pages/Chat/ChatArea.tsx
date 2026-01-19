import { FormEvent, useRef } from 'react'

interface ChatAreaProps {
  messages: string[]
  pendingMessage: string
  setPendingMessage: (message: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  hasMessages: boolean
}

function ChatArea({ messages, pendingMessage, setPendingMessage, onSubmit, hasMessages }: ChatAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="chat-area">
      {hasMessages && (
        <div className="messages" aria-live="polite">
          {messages.map((message, index) => {
            const isUser = message.startsWith("You:");
            const isBot = message.startsWith("Bot:");
            
            return (
              <div 
                key={index} 
                className={`chat-bubble ${isUser ? 'user' : isBot ? 'bot' : ''}`}
              >
                <span>{message}</span>
              </div>
            );
          })}
        </div>
      )}

      <form
        className={`input-box ${hasMessages ? 'input-bottom' : 'input-centered'}`}
        onSubmit={onSubmit}
      >
        <button 
          className="add" 
          type="button" 
          title="Upload file"
          onClick={handleFileClick}
        >
          <i className="fa-solid fa-plus" aria-hidden="true" />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: 'none' }}
          aria-hidden="true"
        />
        <input
          id="imp"
          type="text"
          placeholder="Enter your query related to IOCL"
          value={pendingMessage}
          onChange={(event) => setPendingMessage(event.target.value)}
        />
        <button className="btn1" type="submit">
          Search
        </button>
      </form>
    </div>
  )
}

export default ChatArea