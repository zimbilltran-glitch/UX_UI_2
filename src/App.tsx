/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sidebar } from './components/Sidebar';
import { FutureGrowth } from './components/FutureGrowth';

export default function App() {
  return (
    <div className="flex h-screen bg-[#0B0F19] overflow-hidden font-sans text-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <FutureGrowth />
      </main>
    </div>
  );
}
