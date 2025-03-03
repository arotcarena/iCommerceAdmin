import React, { useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import { useAlert } from 'Components/Contexts/AlertContext';
import { LoginData } from 'type/formTypes';
import { useMutation } from '@tanstack/react-query';
import { LoginForm } from './LoginForm';
import { useTranslation } from 'react-i18next';
import { CustomFetchError } from 'functions/api/customFetch/customFetch';
import { getAuthToken } from 'functions/storage/auth/authTokenStorage';
import { generateUrl } from 'functions/router/urlGenerator';
import { hasStoredUnauthorizedEvent, resetUnauthorizedEvent } from 'functions/storage/auth/unauthorizedStorage';
import { useLoginUser } from 'functions/auth/useLoginUser';


export function Login() {
    const {createAlert} = useAlert();
    const navigate = useNavigate();
    const loginUser = useLoginUser();
    const {t} = useTranslation();

    //if target key exists, show redirect alert
    useEffect(() => {
        if(getAuthToken()) {
            navigate(generateUrl('home'));
            return;
        }
        if(hasStoredUnauthorizedEvent()) {
            createAlert('danger', t('error.auth'));
            resetUnauthorizedEvent();
        }
    //eslint-disable-next-line
    }, []);

    const {mutate, isPending, error} = useMutation({
        mutationFn: (formData: LoginData) => loginUser(formData),
        onSuccess: () => {
            createAlert('success', t('success.login'));
        }
    });

    return (
        <LoginForm
            onSubmit={mutate}
            isLoading={isPending}
            errorMessage={error instanceof CustomFetchError ? error.data.message: null}
        />
    )
};


