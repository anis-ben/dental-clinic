'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './Button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50/50 border border-red-200/80 rounded-2xl p-6 text-center space-y-4 my-4 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto text-status-rose">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {this.props.fallbackTitle || 'حدث خطأ غير متوقع في هذا المكون'}
            </h3>
            <p className="text-sm text-slate-600 mt-1 dir-ltr font-mono text-xs">
              {this.state.error?.message || 'Error executing component operation'}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={this.handleReset} className="mx-auto">
            <RefreshCw className="w-4 h-4 ml-2" />
            إعادة المحاولة
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
