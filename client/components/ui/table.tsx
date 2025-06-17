"use client";
import * as React from "react";

export function Table({ children }: React.PropsWithChildren<{}>) {
  return (
    <table className="min-w-full divide-y divide-gray-200">{children}</table>
  );
}

export function TableHeader({ children }: React.PropsWithChildren<{}>) {
  return <thead className="bg-gray-50">{children}</thead>;
}

export function TableBody({ children }: React.PropsWithChildren<{}>) {
  return (
    <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>
  );
}

export function TableRow({ children }: React.PropsWithChildren<{}>) {
  return <tr className="hover:bg-gray-100">{children}</tr>;
}

export function TableHead({ children }: React.PropsWithChildren<{}>) {
  return (
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
      {children}
    </th>
  );
}

export function TableCell({
  children,
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-6 py-4 whitespace-nowrap text-sm text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </td>
  );
}
