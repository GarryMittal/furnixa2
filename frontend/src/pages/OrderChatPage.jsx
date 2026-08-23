import useOrderChatPage from "../hooks/useOrderChatPage";
import { PageError } from "../components/PageError";
import { OrderChatPanelSkeleton } from "../components/LoadingSkeletons";
import { HeadphonesIcon, VideoIcon } from "lucide-react";

import {
  Chat,
  Channel,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";

function OrderChatPage() {
  const { paid, client, error, channel, inviteMutation, canInvite } =
    useOrderChatPage();

  if (!paid) {
    return (
      <p className="text-base-content/60">
        Order must be paid to open support chat
      </p>
    );
  }

  if (error) {
    return <PageError message={error} />;
  }

  if (!client || !channel) {
    return <OrderChatPanelSkeleton />;
  }

  return (
    <div className="space-y-4 text-left">
      <div className="flex flex-wrap items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-800">
          <HeadphonesIcon className="size-6" aria-hidden />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-neutral-900">Message support</h3>
          <p className="text-sm text-neutral-500">
            Ask about this order, shipping, or returns. Support can send a video call link here
            when needed; both sides use the same Join button.
          </p>
          {canInvite ? (
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:opacity-60"
                disabled={inviteMutation.isPending}
                onClick={() => inviteMutation.mutate()}
              >
                {inviteMutation.isPending ? (
                  <span
                    className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white"
                    aria-hidden
                  />
                ) : (
                  <VideoIcon className="size-4" aria-hidden />
                  
                )}
                Send video call invite
              </button>
              {inviteMutation.isError ? (
                <span className="text-sm text-red-500">Could not send invite.</span>
              ) : null}
              {inviteMutation.isSuccess ? (
                <span className="text-sm text-green-600">Invite sent.</span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="stream-panel h-140 overflow-hidden rounded-2xl border border-neutral-700 bg-neutral-950 [&_.str-chat\_\_main-panel]:min-h-0">
        <Chat client={client} theme="messaging str-chat__theme-dark">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
            <Thread />
          </Channel>
        </Chat>
      </div>
    </div>
  );
}

export default OrderChatPage;
