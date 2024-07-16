import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent } from "./ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import SpecialLoadingButton from "./SpecialLoadingButton";

const Messages = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const { loading, messages, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleMessageDelete = (id) => {
    setMessageId(id);
    dispatch()
  }

  return (
    <>
      <div className="min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20">
        <Tabs>
          <TabsContent>
            <Card>
              <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
                <CardTitle>Messages</CardTitle>
                <Button
                  className="w-fit"
                  onClick={() => handleReturnToDashboard}
                >
                  Return to Dashboard
                </Button>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {messages && messages.length > 0 ? (
                  messages.map((element) => {
                    return (
                      <Card key={element._id} className="grid gap-2">
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Sender Name: </span>
                          {element.senderName}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Subject: </span>
                          {element.subject}
                        </CardDescription>
                        <CardDescription className="text-slate-950">
                          <span className="font-bold mr-2">Message: </span>
                          {element.message}
                        </CardDescription>
                        <CardFooter className="justify-end">
                          {loading &&
                            (messageId === element._id ? (
                              <SpecialLoadingButton width={"w-32"}
                                content={"Deleting message"}
                              />
                            ) : (
                              <Button className="w-32" onClick={() => handleMessageDelete(element._id)}>Delete</Button>
                            ))}
                        </CardFooter>
                      </Card>
                    );
                  })
                ) : (
                  <CardHeader>No messages arrived till now.</CardHeader>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Messages;
