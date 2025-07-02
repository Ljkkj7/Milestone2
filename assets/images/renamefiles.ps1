Write-Host "Looking for .jpg files to rename..."

Get-ChildItem *.png | ForEach-Object {
    $currentName = $_.Name
    $newName = $currentName.ToLower()

    # Only proceed if there are uppercase letters
    if ($currentName -cmatch '[A-Z]') {
        # Create a temporary name by adding a suffix
        $tempName = "$currentName.tmprename"

        # Rename to temporary name first
        Rename-Item -Path $_.FullName -NewName $tempName -Force

        # Then rename to the final lowercase name
        Rename-Item -Path $tempName -NewName $newName -Force

        Write-Host "Renamed: $currentName -> $newName"
    } else {
        Write-Host "Skipped (no uppercase letters): $currentName"
    }
}

Write-Host "Renaming complete!"
Read-Host "Press Enter to close"