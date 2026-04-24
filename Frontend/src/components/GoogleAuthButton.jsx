import { useEffect, useRef, useState } from 'react'

function GoogleAuthButton({ onSuccess, onError, text = 'continue_with' }) {
  const buttonRef = useRef(null)
  const [isGoogleUnavailable, setIsGoogleUnavailable] = useState(false)

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

    if (!clientId) {
      setIsGoogleUnavailable(true)
      return
    }

    const loadGoogleScript = () => new Promise((resolve, reject) => {
      if (window.google?.accounts?.id) {
        resolve()
        return
      }

      const existingScript = document.querySelector('script[data-google-identity="true"]')
      if (existingScript) {
        existingScript.addEventListener('load', () => resolve())
        existingScript.addEventListener('error', () => reject(new Error('Failed to load Google script')))
        return
      }

      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      script.defer = true
      script.dataset.googleIdentity = 'true'
      script.onload = () => resolve()
      script.onerror = () => reject(new Error('Failed to load Google script'))
      document.head.appendChild(script)
    })

    loadGoogleScript()
      .then(() => {
        if (!buttonRef.current || !window.google?.accounts?.id) {
          setIsGoogleUnavailable(true)
          return
        }

        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: ({ credential }) => {
            if (!credential) {
              onError('Google login failed')
              return
            }
            onSuccess(credential)
          }
        })

        buttonRef.current.innerHTML = ''
        window.google.accounts.id.renderButton(buttonRef.current, {
          type: 'standard',
          size: 'large',
          text,
          shape: 'pill',
          theme: 'outline',
          logo_alignment: 'left',
          width: buttonRef.current.offsetWidth || 320
        })
      })
      .catch(() => {
        setIsGoogleUnavailable(true)
      })
  }, [onError, onSuccess, text])

  if (isGoogleUnavailable) {
    return (
      <p className="text-xs text-neutral-500 text-center">
        Google login is unavailable. Add <code>VITE_GOOGLE_CLIENT_ID</code> in your frontend env.
      </p>
    )
  }

  return <div ref={buttonRef} className="w-full flex justify-center" />
}

export default GoogleAuthButton
