import {  Trash } from "tabler-icons-react";
import {  Text } from "@mantine/core";
import { useModals } from "@mantine/modals";
import React from "react";

const DeleteModal = ({ deleteTodayTask, id }) => {
  const modals = useModals();

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Delete your profile",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete this task? This action is destructive
          and you will have to contact support to restore your data.
        </Text>
      ),
      labels: { confirm: "Delete Task", cancel: "No don't delete it" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => deleteTodayTask(id),
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
