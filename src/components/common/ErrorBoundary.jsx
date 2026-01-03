import React from 'react';

export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 20,
                    color: '#ff6b6b',
                    background: '#0a0a0a',
                    fontFamily: 'monospace'
                }}>
                    <h1 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>⚠️ SYSTEM FAILURE</h1>
                    <div style={{
                        background: '#1a1a1a',
                        padding: '1rem',
                        borderRadius: '8px',
                        border: '1px solid #333',
                        maxWidth: '100%',
                        overflow: 'auto',
                        marginBottom: '1rem'
                    }}>
                        <pre style={{ margin: 0, fontSize: '0.8rem', color: '#ccc' }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>
                    </div>
                    <button
                        onClick={() => {
                            if ('serviceWorker' in navigator) {
                                navigator.serviceWorker.getRegistrations().then(registrations => {
                                    for (let registration of registrations) { registration.unregister() }
                                });
                            }
                            window.location.reload(true);
                        }}
                        style={{
                            padding: '12px 24px',
                            background: '#22c55e',
                            color: 'black',
                            border: 'none',
                            borderRadius: '4px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}>
                        HARD RESET
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
