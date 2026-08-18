import { Badge, Button, Card, Dropdown, EmptyState, ErrorState, Input, ProgressBar, Select, Skeleton, Spinner, Tabs, Textarea, Toast, Tooltip } from '../design-system';
import { useState } from 'react';

const tabItems = [
  { label: 'Overview', value: 'overview' },
  { label: 'Components', value: 'components' },
  { label: 'Tokens', value: 'tokens' },
];

export const DesignSystemPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selected, setSelected] = useState('robotics');

  return (
    <div className="mx-auto max-w-7xl space-y-10 px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-blue-600 dark:text-blue-400">Design System</p>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Reusable UI foundation</h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
          Centralized tokens for typography, spacing, borders, theme color roles, and reusable components keep the product consistent and scalable.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Buttons & badges</h2>
            <Badge variant="info">UI</Badge>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge>Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
          </div>
        </Card>

        <Card>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Form controls</h2>
            <Badge variant="success">Live</Badge>
          </div>

          <div className="space-y-4">
            <Input placeholder="Enter project name" />
            <Textarea rows={4} placeholder="Describe your robot project..." />
            <Select
              options={[
                { label: 'Robotics Fundamentals', value: 'robotics' },
                { label: 'Programming', value: 'programming' },
                { label: 'Autonomous Robotics', value: 'autonomous' },
              ]}
              value={selected}
              onChange={(value) => setSelected(value)}
            />
            <Dropdown
              label="Choose track"
              items={[
                { label: 'Robotics Fundamentals', value: 'robotics' },
                { label: 'Sensors', value: 'sensors' },
                { label: 'Robot Arms', value: 'arms' },
              ]}
              value={selected}
              onChange={(value) => setSelected(value)}
            />
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">Tabs & progress</h2>
          <Tabs items={tabItems} value={activeTab} onChange={setActiveTab} />
          <div className="mt-6 space-y-4">
            <ProgressBar value={72} />
            <ProgressBar value={45} size="lg" />
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">Feedback states</h2>
          <div className="space-y-4">
            <Toast message="Saved successfully" variant="success" />
            <div className="flex items-center gap-3">
              <Spinner />
              <span className="text-sm text-slate-600 dark:text-slate-300">Initializing simulator...</span>
            </div>
            <Tooltip label="Robotics learner profile">
              <Button variant="secondary" size="sm">Hover me</Button>
            </Tooltip>
          </div>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">Skeleton & empty state</h2>
          <Skeleton lines={4} />
          <div className="mt-5">
            <EmptyState
              title="No projects yet"
              description="Start a project to unlock new robotics challenges and track progress."
              action={<Button size="sm">Create project</Button>}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-white">Error state</h2>
          <ErrorState
            title="Simulation failed"
            message="The robot controller could not be parsed. Please review the logic and retry."
            action={<Button variant="secondary" size="sm">Retry</Button>}
          />
        </Card>
      </div>
    </div>
  );
};
