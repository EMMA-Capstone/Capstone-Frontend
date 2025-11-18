import * as SwitchPrimitives from "@radix-ui/react-switch";
import { ComponentPropsWithoutRef } from "react";

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  checked: boolean;
  onCheckedChange: (value: boolean) => void;
}

export default function Switch({ checked, onCheckedChange, ...props }: SwitchProps) {
  return (
    <SwitchPrimitives.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      {...props}
      className={`
        w-12 h-6 rounded-full
        bg-gray-600 data-[state=checked]:bg-green-500
        transition relative
        hover:cursor-pointer
        ${props.className ?? ""}
      `}
    >
      <SwitchPrimitives.Thumb
        className={`
          block w-5 h-5 rounded-full bg-white
          translate-x-0.5
          data-[state=checked]:translate-x-[26px]
          transition
          hover:cursor-pointer
        `}
      />
    </SwitchPrimitives.Root>
  );
}
