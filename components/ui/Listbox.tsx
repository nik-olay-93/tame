import { Listbox, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction } from "react";
import CustomIcon from "./CustomIcon";

export interface ListboxProps<T> {
  value: T;
  display: (v: T) => string | undefined;
  onChange: Dispatch<SetStateAction<T>>;
  label: string;
  empty: string;
  values: T[];
}

export default function CustomListbox<T>({
  empty,
  label,
  display,
  onChange,
  value,
  values,
}: ListboxProps<T>) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="relative p-2 flex flex-row gap-1 items-center border rounded-md dark:border-[#424242]">
          <span>
            {label} {display(value) ?? empty}
          </span>
          <CustomIcon icon="fluent:chevron-up-down-20-regular" />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          enter="transition ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
        >
          <Listbox.Options className="mt-1 absolute rounded-md z-10 bg-primary-light dark:bg-primary-dark border dark:border-[#424242]">
            <Listbox.Option
              className={`relative cursor-default select-none p-1 m-1 ${
                values.length > 0 ? "border-b dark:border-[#424242]" : ""
              }`}
              value={null}
            >
              {({ selected }) => (
                <span className="flex flex-row gap-2 items-center">
                  {empty}
                  {selected ? (
                    <CustomIcon icon="fluent:checkmark-20-regular" />
                  ) : null}
                </span>
              )}
            </Listbox.Option>
            {values.map((v, id, a) => (
              <Listbox.Option
                key={id}
                className={`relative cursor-default select-none p-1 m-1 ${
                  id !== a.length - 1 ? "border-b dark:border-[#424242]" : ""
                }`}
                value={v}
              >
                {({ selected }) => (
                  <span className="flex flex-row gap-2 items-center">
                    {display(v)}
                    {selected ? (
                      <CustomIcon icon="fluent:checkmark-20-regular" />
                    ) : null}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
