$src = "C:\Users\DELL\.gemini\antigravity\brain\3823be51-7239-41bd-b9f4-d73c2e487027"
$dst = "C:\Users\DELL\Desktop\Timxpert"

Copy-Item "$src\showcase_product_demo_1778127051212.png" "$dst\img_showcase_product_demo.png"
Copy-Item "$src\showcase_explainer_1778127086865.png"    "$dst\img_showcase_explainer.png"
Copy-Item "$src\showcase_course_promo_1778127099279.png"  "$dst\img_showcase_course.png"
Copy-Item "$src\showcase_onboarding_1778127142936.png"    "$dst\img_showcase_onboarding.png"
Copy-Item "$src\showcase_launch_1778127261336.png"        "$dst\img_showcase_launch.png"
Copy-Item "$src\showcase_case_study_1778127439191.png"    "$dst\img_showcase_case_study.png"

Write-Host "Done! All 6 images copied to Timxpert folder."
