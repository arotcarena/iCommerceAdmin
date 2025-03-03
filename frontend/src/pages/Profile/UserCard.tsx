import { Card, CardBody } from "reactstrap"
import { User } from "type/entityTypes"
import defaultAvatar from "../../assets/images/users/avatar-default.jpg";
import { useTranslation } from "react-i18next";
import { getEntityAttachmentUrl } from "functions/files/entityAttachmentUrlResolver";

type Props = {
    user: User
};

export const UserCard = ({user}: Props) => {
    const {t} = useTranslation();

    return (
        <Card className="w-100" style={{minHeight: '117px'}}>
            <CardBody>
                <div className="d-flex">
                    <div className="mx-3">
                        <img
                            src={user?.avatar?.id ? getEntityAttachmentUrl(user.avatar.id): defaultAvatar}
                            alt={t('user_avatar')}
                            className="avatar-md rounded-circle img-thumbnail"
                        />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                        <div className="text-muted">
                            <h5>{user.firstName} {user.lastName}</h5>
                            <div data-testid="user">{user.email}</div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}