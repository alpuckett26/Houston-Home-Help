"use client";

import { useActionState, useMemo, useState } from "react";
import type { Caregiver, FamilyRequest, RequestStatus } from "@/lib/types";
import { requestStatuses } from "@/lib/constants";
import {
  createMatchAction,
  saveAdminNoteAction,
  updateRequestStatusAction
} from "@/app/admin/actions";
import { initialActionState } from "@/app/actions";
import { FormFeedback } from "@/components/forms/form-feedback";
import { SubmitButton } from "@/components/forms/submit-button";

type Props = {
  requests: FamilyRequest[];
  caregivers: Caregiver[];
};

export function MatchWorkbench({ requests, caregivers }: Props) {
  const [zip, setZip] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | RequestStatus>("all");
  const [selectedRequestId, setSelectedRequestId] = useState<string>(requests[0]?.id ?? "");
  const [selectedCaregiverId, setSelectedCaregiverId] = useState<string>("");
  const [mode, setMode] = useState<"company" | "registry">("company");
  const [nextStatus, setNextStatus] = useState<RequestStatus>("reviewing");

  const [matchState, matchAction] = useActionState(createMatchAction, initialActionState);
  const [noteState, noteAction] = useActionState(saveAdminNoteAction, initialActionState);
  const [statusState, statusAction] = useActionState(updateRequestStatusAction, initialActionState);

  const filteredRequests = useMemo(
    () =>
      requests.filter((r) => {
        const zipPass = zip ? r.zip_code.includes(zip) : true;
        const statusPass = statusFilter === "all" ? true : r.status === statusFilter;
        return zipPass && statusPass;
      }),
    [requests, statusFilter, zip]
  );

  const selectedRequest =
    filteredRequests.find((r) => r.id === selectedRequestId) ?? filteredRequests[0] ?? null;

  const eligibleCaregivers = useMemo(() => {
    if (!selectedRequest) return [];
    return caregivers.filter((c) => {
      if (c.zip_code !== selectedRequest.zip_code) return false;
      if (c.application_status !== "approved") return false;
      return mode === "company" ? c.approved_for_company_service : c.approved_for_registry;
    });
  }, [caregivers, mode, selectedRequest]);

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
          placeholder="Filter ZIP"
          className="field"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "all" | RequestStatus)}
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
                {r.contact_name} · {r.zip_code}
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
          <p className="font-semibold text-ink">
            {selectedRequest.contact_name} · {selectedRequest.zip_code} · {selectedRequest.preferred_model}
          </p>
          <p className="mt-1 text-xs text-ink-500">ID {selectedRequest.id}</p>
          <p className="mt-2">{selectedRequest.support_summary}</p>
          <p className="mt-1 text-ink-500">Schedule: {selectedRequest.preferred_schedule}</p>
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-ink/15 p-4 text-sm text-ink-500">
          No requests match current filters.
        </p>
      )}

      {/* Create match */}
      <form action={matchAction} className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <input type="hidden" name="requestId" value={selectedRequest?.id ?? ""} />
        <input type="hidden" name="mode" value={mode} />
        <select
          name="caregiverId"
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
        <SubmitButton label="Create match" pendingLabel="Creating match…" />
      </form>

      {eligibleCaregivers.length === 0 && selectedRequest ? (
        <p className="text-sm text-sun-600">No approved caregivers for this ZIP and mode yet.</p>
      ) : null}

      <FormFeedback state={matchState} />

      {/* Status update + family message */}
      <form action={statusAction} className="grid gap-3 rounded-2xl border border-ink/5 bg-white p-4">
        <input type="hidden" name="requestId" value={selectedRequest?.id ?? ""} />
        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
          <select
            name="status"
            value={nextStatus}
            onChange={(e) => setNextStatus(e.target.value as RequestStatus)}
            className="field-select"
          >
            {requestStatuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <input
            name="familyMessage"
            placeholder="Optional message visible to the family (sent by email)"
            className="field"
          />
        </div>
        <SubmitButton label="Update status" pendingLabel="Updating…" />
      </form>
      <FormFeedback state={statusState} />

      {/* Internal note */}
      <form action={noteAction} className="grid gap-3 rounded-2xl border border-ink/5 bg-white p-4">
        <input type="hidden" name="relatedType" value="family_request" />
        <input type="hidden" name="relatedId" value={selectedRequest?.id ?? ""} />
        <textarea
          name="note"
          placeholder="Internal note (not visible to family)"
          className="field min-h-24 resize-y"
        />
        <div>
          <SubmitButton label="Save internal note" pendingLabel="Saving…" />
        </div>
      </form>
      <FormFeedback state={noteState} />
    </div>
  );
}
