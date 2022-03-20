import { Eye, Trash, Pencil } from "tabler-icons-react";
import { Button, Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";

const DeleteModal = () => {
  const modals = useModals();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete your profile? This action is
          destructive and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete account", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => console.log("Confirmed"),
    });
  return (
    <>
      <span onClick={openDeleteModal} color="red">
        <Trash />
      </span>
    </>
  );
};

export default DeleteModal;
