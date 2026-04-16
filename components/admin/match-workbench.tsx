"use client";

import { useMemo, useState } from "react";
import type { Caregiver, FamilyRequest, RequestStatus } from "@/lib/types";
import { requestStatuses } from "@/lib/constants";

type Props = {
  requests: FamilyRequest[];
  caregivers: Caregiver[];
};

export function MatchWorkbench({ requests, caregivers }: Props) {
  const [zip, setZip] = useState("");
  const [status, setStatus] = useState<"all" | RequestStatus>("all");
  const [selectedRequestId, setSelectedRequestId] = useState<string>(requests[0]?.id ?? "");
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string>("");
  const [mode, setMode] = useState<"company" | "registry">("company");
  const [note, setNote] = useState("");
  const [message, setMessage] = useState("");

  const filteredRequests = useMemo(
    () =>
      requests.filter((r) => {
        const zipPass = zip ? r.zip_code.includes(zip) : true;
        const statusPass = status === "all" ? true : r.status === status;
        return zipPass && statusPass;
      }),
    [requests, status, zip]
  );

  const selectedRequest =
    filteredRequests.find((r) => r.id === selectedRequestId) ?? filteredRequests[0] ?? null;

  const eligibleCaregivers = useMemo(() => {
    if (!selectedRequest) return [];
    return caregivers.filter((c) => {
      if (c.zip_code !== selectedRequest.zip_code) return false;
      if (mode === "company") return c.approved_for_company_service;
      return c.approved_for_registry;
    });
  }, [caregivers, mode, selectedRequest]);

  const assign = () => {
    if (!selectedRequest || !selectedCaregiverId) {
      setMessage("Select a request and caregiver to create a match.");
      return;
    }
    setMessage(`Draft match created: ${selectedRequest.id} → ${selectedCaregiverId} (${mode})`);
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Filter ZIP"
          className="field"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "all" | RequestStatus)}
          className="field-select"
        >
          <option value="all">All statuses</option>
          {requestStatuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select
          value={selectedRequestId}
          onChange={(e) => setSelectedRequestId(e.target.value)}
          className="field-select"
        >
          {filteredRequests.length ? (
            filteredRequests.map((r) => (
              <option key={r.id} value={r.id}>
                {r.id} · {r.contact_name}
              </option>
            ))
          ) : (
            <option>No requests found</option>
          )}
        </select>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as "company" | "registry")}
          className="field-select"
        >
          <option value="company">Company assignment</option>
          <option value="registry">Registry introduction</option>
        </select>
      </div>

      {selectedRequest ? (
        <div className="rounded-2xl border border-ink/5 bg-cream-100 p-4 text-sm text-ink-700">
          <p className="font-semibold text-ink">Selected: {selectedRequest.id}</p>
          <p className="mt-1">{selectedRequest.contact_name} · {selectedRequest.zip_code} · {selectedRequest.preferred_model}</p>
          <p className="mt-2">{selectedRequest.support_summary}</p>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-ink-500">
          No requests match current filters.
        </p>
      )}

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <select
          value={selectedCaregiverId}
          onChange={(e) => setSelectedCaregiverId(e.target.value)}
          className="field-select"
        >
          <option value="">Select caregiver</option>
          {eligibleCaregivers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.full_name} · {c.zip_code}
            </option>
          ))}
        </select>
        <button
          onClick={assign}
          type="button"
          className="inline-flex items-center justify-center rounded-full bg-hhh-700 px-5 py-3 text-sm font-semibold text-cream hover:bg-hhh-800"
        >
          Create match
        </button>
      </div>

      {eligibleCaregivers.length === 0 ? (
        <p className="text-sm text-sun-600">No eligible caregivers for this ZIP / mode yet.</p>
      ) : null}

      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Internal note"
        className="field min-h-24 resize-y"
      />
      <button
        type="button"
        onClick={() =>
          setMessage(
            note ? `Internal note saved: ${note.slice(0, 60)}…` : "Please enter a note first."
          )
        }
        className="inline-flex items-center rounded-full border border-hhh-700/30 px-4 py-2 text-sm font-semibold text-hhh-700 hover:bg-hhh-50"
      >
        Save internal note
      </button>

      {message ? (
        <p className="rounded-xl bg-hhh-50 px-4 py-3 text-sm text-hhh-800 ring-1 ring-hhh-200">{message}</p>
      ) : null}
    </div>
  );
}
