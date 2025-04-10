"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { LogoutButton } from "./logout-button";

export const UserButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback className="bg-gray-600">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-gray-800 border border-gray-400 p-2 text-white font-semibold text-md rounded-md shadow-lg"
      >
        <DropdownMenuItem className="hover:bg-gray-700">Profile</DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">Settings</DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-gray-700">
          <LogoutButton>
            LogOut
          </LogoutButton>
          </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
 