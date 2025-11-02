import { Suspense } from "react";
import CombatClient from "./CombatClient";

export default function CombatPage() {
  return (
    <Suspense fallback={<div>Loading Combat...</div>}>
      <CombatClient />
    </Suspense>
  );
}
