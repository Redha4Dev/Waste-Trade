-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `password` VARCHAR(191) NULL,
    `role` ENUM('Seller', 'Buyer', 'Admin') NOT NULL DEFAULT 'Seller',
    `phone` VARCHAR(191) NULL,
    `verificationCode` VARCHAR(191) NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_active` DATETIME(3) NULL,
    `password_reset_token` VARCHAR(191) NULL,
    `password_reset_token_expires_in` DATETIME(3) NULL,
    `Password_changed_at` DATETIME(3) NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Listing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `type` ENUM('plastic', 'metal', 'organic') NOT NULL,
    `sub_type` VARCHAR(191) NULL,
    `quantity` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `status` ENUM('available', 'sold', 'reserved') NOT NULL DEFAULT 'available',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `is_read` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sender_id` INTEGER NOT NULL,
    `receiver_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Listing` ADD CONSTRAINT `Listing_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_sender_id_fkey` FOREIGN KEY (`sender_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_receiver_id_fkey` FOREIGN KEY (`receiver_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
