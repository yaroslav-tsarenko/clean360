"use client";

import { getService, type DetailGroup, type DetailItem, type ServiceId } from "@/data/services";
import { cn } from "@/lib/cn";
import { CloseButton, Modal } from "./Modal";

type Props = {
  open: boolean;
  serviceId: ServiceId;
  onClose: () => void;
  onOrder: () => void;
};

/** Попап «Детальніше» для будь-якої послуги — рендериться з даних, а не дублюється в розмітці */
export function ServiceModal({ open, serviceId, onClose, onOrder }: Props) {
  const service = getService(serviceId);
  const { layout, heading, groups } = service.details;
  const titleId = "service-modal-title";

  return (
    <Modal open={open} onClose={onClose} labelledBy={titleId} className="px-10 py-10 max-sm:px-3 max-sm:py-4">
      <div className="modal-card relative flex w-full max-w-[1100px] flex-col items-start gap-8 rounded-[28px] bg-white p-12 shadow-[0_24px_60px_-24px_rgb(0_0_0/0.25)] ring-1 ring-black/5 max-md:p-8 max-sm:gap-6 max-sm:rounded-3xl max-sm:px-5 max-sm:pt-6 max-sm:pb-7">
        <CloseButton onClick={onClose} pinned />
        <div className="flex flex-col gap-2 pr-16 max-sm:pr-14">
          <p className="text-[11px] tracking-[4px] text-muted uppercase">Вид послуги</p>
          <h2 id={titleId} className="text-[32px] leading-[1.15] font-semibold tracking-tight text-ink max-sm:text-[24px]">
            {heading ?? service.name}
          </h2>
        </div>
        <div
          className={cn(
            "grid w-full gap-x-16 gap-y-10 max-sm:gap-y-7",
            groups.length > 1 && "grid-cols-2 max-lg:grid-cols-1",
            layout === "columns" && "lg:gap-x-24",
          )}
        >
          {groups.map((group, i) => (
            <Group key={`${service.id}-${i}`} group={group} />
          ))}
        </div>
      </div>
      <button type="button" onClick={onOrder} className="btn-primary mt-8 w-auto max-sm:mt-5 max-sm:w-full max-sm:max-w-[340px]">
        Замовити прибирання
      </button>
    </Modal>
  );
}

function Group({ group }: { group: DetailGroup }) {
  return (
    <section className="flex flex-col gap-4 max-sm:gap-3">
      <header className="flex flex-col gap-1 border-b border-black/[0.07] pb-3">
        {group.title && <p className="text-[12px] font-semibold tracking-[2px] text-brand uppercase">{group.title}</p>}
        {group.subtitle && (
          <h3 className="text-[20px] leading-7 font-semibold text-ink max-sm:text-[17px] max-sm:leading-6">{group.subtitle}</h3>
        )}
      </header>
      <ul className="flex flex-col gap-3 max-sm:gap-2.5">
        {group.items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </ul>
      {group.note && (
        <p className="mt-1 flex w-fit flex-wrap items-center gap-x-1.5 rounded-full bg-chip/70 px-4 py-2 text-[14px] text-gray max-sm:text-[13px]">
          {group.note.label}
          <span className="font-semibold text-brand">{group.note.value}</span>
        </p>
      )}
    </section>
  );
}

function Item({ item }: { item: DetailItem }) {
  const isPriced = typeof item !== "string";
  return (
    <li className="flex items-start gap-3 text-[15px] leading-6 text-gray max-sm:text-[14px] max-sm:leading-[22px]">
      <span aria-hidden className="mt-[9px] size-1.5 shrink-0 rounded-full bg-brand/70 max-sm:mt-2" />
      {isPriced ? (
        <span className="flex min-w-0 flex-1 flex-wrap items-baseline gap-x-1.5">
          <span className="max-w-full">{item.label}</span>
          <span aria-hidden className="min-w-3 flex-1 translate-y-[-3px] border-b border-dotted border-black/20" />
          <span className="ml-auto shrink-0 font-semibold whitespace-nowrap text-ink">{item.price}</span>
        </span>
      ) : (
        <span>{item}</span>
      )}
    </li>
  );
}
