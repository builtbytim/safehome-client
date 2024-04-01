"use client";

import { useEffect, useState } from "react";
import { ToggleCard } from "../../../components/security";
import {
	fetchUtil,
	makeUrl,
	extractErrorMessage,
} from "../../../utils/fetchUtils";
import { useQueryClient } from "react-query";
import { useNotifyStore } from "../../../utils/store";
import { useMutation, useQuery } from "react-query";
import queryKeys from "../../../utils/queryKeys";
import config from "../../../utils/config";
import SecureRoute from "../../../components/SecureRoute";
import { startTransition } from "react";
import ErrorMessageView from "../../../components/ErrorMessageView";
import LoadingView from "../../../components/LoadingView";

function Page({ authenticationToken }) {
	const queryClient = useQueryClient();

	const [preferences, setPreferences] = useState({
		pushNotification: true,
		emailAlerts: true,
		smsAlerts: false,
	});

	function updatePreferencesLocalState(obj) {
		setPreferences({
			...preferences,
			...obj,
		});
	}

	const { isLoading, isError, data, refetch, isSuccess } = useQuery({
		queryKey: [queryKeys.getNotificationPreferences, authenticationToken],

		onSuccess(data) {
			startTransition(() => {
				setPreferences({
					pushNotification: data.push,
					emailAlerts: data.email,
					smsAlerts: data.sms,
				});
			});
		},

		queryFn: async function (body) {
			const res = await fetchUtil({
				url: makeUrl(config.apiPaths.getNotificationPreferences),
				method: "GET",
				body,
				auth: authenticationToken,
			});

			if (!res.success) {
				throw new Error(extractErrorMessage(res));
			}

			return res.data;
		},
	});

	const setNotify = useNotifyStore((state) => state.setNotify);

	function onSuccess(data) {
		queryClient.invalidateQueries({
			queryKey: [queryKeys.getNotificationPreferences, authenticationToken],
		});
	}

	function onError(err) {
		setNotify({
			show: true,
			content: err.message,
			allowClose: true,
		});
	}

	const { mutate, isLoading: isLoading2 } = useMutation({
		onSuccess,
		onError,
		mutationFn: async function (body) {
			const res = await fetchUtil({
				url: makeUrl(config.apiPaths.setNotificationPreferences),
				method: "POST",
				body,
				auth: authenticationToken,
			});

			if (!res.success) {
				throw new Error(extractErrorMessage(res));
			}

			return res.data;
		},

		mutationKey: [queryKeys.setNotificationPreferences, authenticationToken],
	});

	const preventInput = isLoading || isLoading2;

	function updatePreferencesOnServer() {
		if (preventInput) {
			return;
		}
		mutate({
			push: preferences.pushNotification,
			email: preferences.emailAlerts,
			sms: preferences.smsAlerts,
		});
	}

	useEffect(() => {
		if (
			preferences.pushNotification === data?.push &&
			preferences.emailAlerts === data?.email &&
			preferences.smsAlerts === data?.sms
		) {
			return;
		}
		updatePreferencesOnServer();
	}, [preferences]);

	return (
		<main className="space-y-4 lg:space-y-5 text-[--text] border border-[--lines]  h-full rounded-2xl overflow-hidden">
			<div className="account-p pb-0  space-y-1">
				<h3 className="popup-header">Notification</h3>
				<p>Manage your notification settings</p>
			</div>
			{isError && (
				<div className="py-16">
					<ErrorMessageView
						refetch={refetch}
						message="Something went wrong while fetching your preferences"
					/>
				</div>
			)}{" "}
			{!isError && isLoading && (
				<div className="py-16">
					<LoadingView />
				</div>
			)}
			{isSuccess && data && (
				<div className="">
					<ToggleCard
						heading="Email Alerts"
						text="Get notifications via your registered email."
						recommended="yes"
						active={data ? data.email : preferences.emailAlerts}
						readOnly
						isLoading={(isLoading && !data) || isLoading2}
						toggleFunc={() => {
							updatePreferencesLocalState({
								emailAlerts: !preferences.emailAlerts,
							});
						}}
					/>
					<ToggleCard
						heading="Push Notification"
						text="Notifications on successful log ins to your account."
						recommended="no"
						readOnly={preventInput}
						isLoading={(isLoading && !data) || isLoading2}
						active={data ? data.push : preferences.pushNotification}
						toggleFunc={() => {
							updatePreferencesLocalState({
								pushNotification: !preferences.pushNotification,
							});
						}}
					/>

					<ToggleCard
						heading="SMS Alerts"
						text="Get notifications via your verified phone number."
						recommended="no"
						readOnly={preventInput}
						isLoading={(isLoading && !data) || isLoading2}
						active={data ? data.sms : preferences.smsAlerts}
						toggleFunc={() => {
							updatePreferencesLocalState({
								smsAlerts: !preferences.smsAlerts,
							});
						}}
					/>
				</div>
			)}
		</main>
	);
}

export default function ProtectedPage(props) {
	return <SecureRoute offspring={Page} {...props} />;
}
