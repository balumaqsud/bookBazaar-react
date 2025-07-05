import { Box, Container, Stack } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useGlobals } from "../../hooks/useGlobals";
import { useState } from "react";
import { MemberUpdateInput } from "../../../libs/types/member";
import { T } from "../../../libs/types/common";
import {
  sweetErrorHandling,
  sweetTopSmallSuccessAlert,
} from "../../../libs/sweetAlerts";
import { Messages, serverApi } from "../../../libs/config";
import MemberService from "../../services/MemberService";
import { Button, FormLabel, Input, Textarea, Typography } from "@mui/joy";

export function Settings() {
  const { authMember, setAuthMember } = useGlobals();
  const [file, setFile] = useState<string>(
    authMember?.memberImage
      ? `${serverApi}/${authMember.memberImage}`
      : "/icons/default-user.svg"
  );

  const [memberUpdateInput, setMemberUpdateInput] = useState<MemberUpdateInput>(
    {
      memberNick: authMember?.memberNick,
      memberEmail: authMember?.memberEmail,
      memberAddress: authMember?.memberAddress,
      memberImage: authMember?.memberImage,
      memberDescription: authMember?.memberDescription,
    }
  );

  //handlers
  const memberNickHandler = (e: T) => {
    memberUpdateInput.memberNick = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberEmailHandler = (e: T) => {
    memberUpdateInput.memberEmail = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberAddressHandler = (e: T) => {
    memberUpdateInput.memberAddress = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const memberDescHandler = (e: T) => {
    memberUpdateInput.memberDescription = e.target.value;
    setMemberUpdateInput({ ...memberUpdateInput });
  };

  const submitButton = async () => {
    try {
      if (!authMember) throw new Error(Messages.error2);
      if (
        memberUpdateInput.memberNick === "" ||
        memberUpdateInput.memberEmail === "" ||
        memberUpdateInput.memberAddress === "" ||
        memberUpdateInput.memberDescription === " "
      ) {
        throw new Error(Messages.error3);
      }

      const member = new MemberService();
      const result = await member.updateMember(memberUpdateInput);
      setAuthMember(result);
      sweetTopSmallSuccessAlert("successfully modified", 700);
    } catch (error) {
      console.log(error);
      sweetErrorHandling(error).then();
    }
  };

  const imageHandler = (e: T) => {
    const file = e.target.files[0];
    const fileType = file.type,
      validate = ["JPG", "JPEG", "PNG"];
    if (validate.includes(fileType)) {
      sweetErrorHandling(Messages.error5);
    } else {
      memberUpdateInput.memberImage = file;
      setMemberUpdateInput({ ...memberUpdateInput });
      setFile(URL.createObjectURL(file));
    }
  };
  return (
    <Stack className={"settings"}>
      <Box className={"member-media-frame"}>
        <img src={file} className={"memberImage"} alt="" />

        <Typography level="body-sm">JPG, JPEG, PNG formats only!</Typography>
        <div className={"up-del-box"}>
          <Button
            component="label"
            variant="soft"
            color="success"
            onChange={imageHandler}
          >
            Edit Image
            <input type="file" hidden />
          </Button>
        </div>
      </Box>
      <Box className={"input"}>
        <Input
          color="neutral"
          size="md"
          variant="outlined"
          type="text"
          placeholder={authMember?.memberNick}
          value={memberUpdateInput.memberNick}
          name="memberNick"
          onChange={memberNickHandler}
        />
        <Input
          color="neutral"
          size="md"
          variant="outlined"
          type="text"
          placeholder={
            authMember?.memberEmail ? authMember?.memberEmail : "no phone"
          }
          value={memberUpdateInput.memberEmail}
          name="memberEmail"
          onChange={memberEmailHandler}
        />
        <Input
          color="neutral"
          size="md"
          variant="outlined"
          className={"spec-input  mb-address"}
          type="text"
          placeholder={
            authMember?.memberAddress ? authMember.memberAddress : "no address"
          }
          value={memberUpdateInput.memberAddress}
          name="memberAddress"
          onChange={memberAddressHandler}
        />
        <FormLabel>Description</FormLabel>
        <Textarea
          minRows={5}
          className={"spec-textarea mb-description"}
          placeholder={
            authMember?.memberDescription
              ? authMember.memberDescription
              : "no description"
          }
          value={memberUpdateInput.memberDescription}
          name="memberDesc"
          onChange={memberDescHandler}
        />
        <Button variant="soft" color="success" onClick={submitButton}>
          Save
        </Button>
      </Box>
    </Stack>
  );
}
