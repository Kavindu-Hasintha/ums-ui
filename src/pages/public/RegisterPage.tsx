import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { IRegisterDto } from '../../types/auth.types';
import InputField from '../../components/general/InputField';
import { yupResolver } from '@hookform/resolvers/yup';
import useAuth from '../../hooks/useAuth.hook';
import Button from '../../components/general/Button';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_PUBLIC } from '../../routes/paths';

const RegisterPage = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const { register } = useAuth();

    const registerSchema = Yup.object().shape({
        firstName: Yup.string().required('First Name is required'),
        lastName: Yup.string().required('Last Name is required'),
        userName: Yup.string().required('User Name is required'),
        email: Yup.string().required('Email is required').email('Input text must be a valid email'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 character')
            .max(16, 'Password must be less than 16 character'),
        address: Yup.string().required('Address is required'),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IRegisterDto>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            userName: '',
            email: '',
            password: '',
            address: '',
        },
    });

    return (
        <div>
            Register Page
        </div>
    );
}

export default RegisterPage;